import { getFilterableFields, toDropdownFormat } from "@/components/Filters/FilterFunctions";
import detailStyles from "@/components/Details/DetailStyles";
import filterStyles from "@/components/Filters/FilterStyles";
import { ThemeContext } from "@/components/ThemeContext";
import { themes } from "@/constants/Themes";
import { FetchedData, FilterData } from "@/constants/Types";
import { useContext, useEffect, useState } from "react";
import { ScrollView, View, Button, TouchableOpacity, Text, Image } from "react-native";
import FilterCard from "@/components/Filters/FilterCard";
import images from "@/constants/Images";


export default function Filters({navigation, route}: {navigation: any; route: any}) {
  const data = route.params.data as FetchedData
  const [filters, setFilters] = useState<FilterData[]>([])
  const theme = useContext(ThemeContext).theme
  const background = themes[theme].background
  const lightBackground = themes[theme].lightBackground
  const lighterBackground = themes[theme].lighterBackground

  const addNewFilter = () => {
    setFilters((prevFilters) => [...prevFilters, { property: undefined, condition: undefined, value: undefined}]);
  };

  useEffect(addNewFilter, [])

  const handleFilterChange = (index: number, updatedFilter: FilterData) => {
    setFilters((prevFilters) => {
      const updatedFilters = [...prevFilters];
      updatedFilters[index] = updatedFilter;
      return updatedFilters;
    });
  };

  const handleDeleteFilter = (index: number) => {
    setFilters((prevFilters) => {
      const updatedFilters = [...prevFilters];
      updatedFilters.splice(index, 1);  // Remove the filter at the specified index
      return updatedFilters;
    });
  };

  const handleConfirm = () => {
    const activeFilters = filters.filter(
      (filter) => filter.property && filter.condition
    )

    const queryString = activeFilters
      .map((filter) => {
        if (["true", "false", "present", "null", "not_null"].includes(filter.condition ?? "")) {
          return `filter[${filter.property}_${filter.condition}]=true`
        }
        else {
          return `filter[${filter.property}_${filter.condition}]=${encodeURIComponent(filter.value || "")}`
        }
      })
      .join("&")

    console.log("Query String:", queryString)
    navigation.goBack()
  }

  return (
    <ScrollView style={detailStyles.wrapper}>
      <View style={[detailStyles.cardWrapper, {gap: 10}]}>
        {filters.map((filter, index) => (
          <FilterCard
            key={index}
            data={data}
            filter={filter}
            onChange={(updatedFilter: FilterData) => handleFilterChange(index, updatedFilter)}
            onDelete={() => handleDeleteFilter(index)}
          />
        ))}
        <View style={[filterStyles.inline, {backgroundColor: background, borderRadius: 10, padding: 10}]}>
          <TouchableOpacity style={[filterStyles.button, {backgroundColor: lightBackground}]} onPress={handleConfirm}><Text style={[filterStyles.text, {textAlign: "center", fontSize: 14}]}>Apply filters</Text></TouchableOpacity>
          <TouchableOpacity style={[filterStyles.addButton, {backgroundColor: lightBackground}]} onPress={addNewFilter}><Image style={filterStyles.buttonImage} source={images.neutral.buttons.newspaper}/></TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}
