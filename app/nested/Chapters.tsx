import { getFilterableFields, toDropdownFormat } from "@/components/Filters/FilterFunctions"
import detailStyles from "@/components/Details/DetailStyles"
import filterStyles from "@/components/Filters/FilterStyles"
import { ThemeContext } from "@/components/ThemeContext"
import { themes } from "@/constants/Themes"
import { FetchedData, FilterData } from "@/constants/Types"
import { useContext, useEffect, useState } from "react"
import { ScrollView, View, Button, TouchableOpacity, Text, Image } from "react-native"
import FilterCard from "@/components/Filters/FilterCard"
import images from "@/constants/Images"


// The whole filter menu with the ability to add multiple filters
export default function Chapters({navigation, route}: {navigation: any, route: any}) {
  const data: FetchedData = route.params.data
  const path: string = route.params.path

  const updateFilters = route.params.updateFilters      // The callback passed from the FetchingList
  const [filters, setFilters] = useState<FilterData[]>([])
  const [loading, setLoading] = useState(true)

  const theme = useContext(ThemeContext).theme
  const background = themes[theme].background
  const lightBackground = themes[theme].lightBackground
  const lighterBackground = themes[theme].lighterBackground


  // Appends a new filter card to the list
  const addNewFilter = () => {
    setFilters((prevFilters) => [...prevFilters, { property: undefined, condition: undefined, value: undefined}])
  }

  // Adds one card on the page load so the user doesn't have to create it manually
  useEffect(addNewFilter, [])


  // Updates the filter list at the index that was changed
  // Fired every time the user changes something
  const handleFilterChange = (index: number, updatedFilter: FilterData) => {
    setFilters((prevFilters) => {
      const updatedFilters = [...prevFilters]
      updatedFilters[index] = updatedFilter
      return updatedFilters
    })
  }

  // Deletes the filter card and removes the filter from the list
  const handleDeleteFilter = (index: number) => {
    setFilters((prevFilters) => {
      const updatedFilters = [...prevFilters]
      updatedFilters.splice(index, 1)
      return updatedFilters
    })
  }

  // Handles the confirm action
  // Builds the query string, fires the callback to the FetchingList and navigates back
  const handleConfirm = () => {
    const activeFilters = filters.filter(
      (filter) => filter.property && filter.condition
    )

    let queryString = ""
    activeFilters.forEach(filter => {
      if (["true", "false", "present", "null", "not_null"].includes(filter.condition ?? "")) {
        queryString += `&filter[${filter.property}_${filter.condition}]=true`
      }
      else {
        queryString += `&filter[${filter.property}_${filter.condition}]=${encodeURIComponent(filter.value ?? "")}`
      }
    })

    updateFilters(queryString)
    navigation.goBack()
  }


  return (
    <ScrollView style={detailStyles.wrapper}>
      <View style={[detailStyles.cardWrapper, {gap: 10}]}>
        {/* Adds every item from the filter list as a card */}
        {filters.map((filter, index) => (
          <FilterCard
            key={index}
            data={data}
            filter={filter}
            onChange={(updatedFilter: FilterData) => handleFilterChange(index, updatedFilter)}
            onDelete={() => handleDeleteFilter(index)}
          />
        ))}

        {/* Control buttons - "confirm" and "add" */}
        <View style={[filterStyles.inline, {backgroundColor: background, borderRadius: 10, padding: 10}]}>
          <TouchableOpacity style={[filterStyles.button, {backgroundColor: lightBackground}]} onPress={handleConfirm}>
            <Text style={[filterStyles.text, {textAlign: "center", fontSize: 14}]}>Apply filters</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[filterStyles.addButton, {backgroundColor: lightBackground}]} onPress={addNewFilter}>
            <Image style={filterStyles.buttonImage} source={images.neutral.buttons.newspaper}/>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}
