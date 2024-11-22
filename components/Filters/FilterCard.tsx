import { filters } from "@/constants/Filters"
import { View, TextInput, Image, TouchableOpacity, Text } from "react-native"
import { Dropdown } from "react-native-element-dropdown"
import detailStyles from "@/components/Details/DetailStyles"
import { themes } from "@/constants/Themes"
import { useContext } from "react"
import { ThemeContext } from "@/components/ThemeContext"
import { toDropdownFormat, getFilterableFields } from "./FilterFunctions"
import filterStyles from "./FilterStyles"
import { FetchedData, FilterCardProps } from "@/constants/Types"
import images from "@/constants/Images"


export default function FilterCard({data, filter, onChange, onDelete}: FilterCardProps) {
  const theme = useContext(ThemeContext).theme
  const lighterBackground = themes[theme].lighterBackground
  const lightBackground = themes[theme].lightBackground
  const background = themes[theme].background

  return (
    <View style={[detailStyles.card, {backgroundColor: background}]}>
      <View style={filterStyles.filter}>

        {/* First row */}
        <View style={filterStyles.inline}>

          {/* Dropdown for property name */}
          <Dropdown
            style={[filterStyles.dropdown, {backgroundColor: lightBackground, flex: 2}]}
            selectedTextStyle={filterStyles.dropdownText}
            placeholder="Property name"
            placeholderStyle={{color: "#ffffff6a", fontFamily: "Lato-Regular", fontSize: 14}}
            containerStyle={[filterStyles.dropdownList, {backgroundColor: lightBackground}]}
            itemTextStyle={{color: "white", fontFamily: "Lato-Regular", fontSize: 14}}
            activeColor={lightBackground}
            data={toDropdownFormat(getFilterableFields(data.data[0]))}
            labelField={"label"}
            valueField={"value"}
            value={filter.property}
            onChange={(item) => onChange({...filter, property: item.value})}
          />

          {/* Button deleting the filter card */}
          <TouchableOpacity style={filterStyles.deleteButton} onPress={onDelete}>
            <Image source={images.neutral.buttons.wands} style={filterStyles.deleteButtonImage}/>
          </TouchableOpacity>

        </View>

        {/* Second row, Dropdown for condition to check */}
        <Dropdown
          style={[filterStyles.dropdown, {backgroundColor: lightBackground, flex: 3}]}
          selectedTextStyle={filterStyles.dropdownText}
          placeholder="Condition"
          placeholderStyle={{color: "#ffffff6a", fontFamily: "Lato-Regular", fontSize: 14}}
          containerStyle={[filterStyles.dropdownList, {backgroundColor: lightBackground}]}
          itemTextStyle={{color: "white", fontFamily: "Lato-Regular", fontSize: 14}}
          activeColor={lightBackground}
          data={filters}
          labelField={"label"}
          valueField={"value"}
          value={filter.condition}
          onChange={(item) => onChange({...filter, condition: item.value})}
        />

        {/* Third row, TextInput for the value to check, hides if a yes/no condition was chosen */}
        {!["true", "false", "present", "null", "not_null"].includes(filter.condition ?? "") && (
          <TextInput
            style={[filterStyles.input, { backgroundColor: lightBackground }]}
            placeholder="Value"
            placeholderTextColor="#ffffff6a"
            value={filter.value}
            onChangeText={(text) => onChange({...filter, value: text})}
          />
        )}

        {/* A tip for those unfamiliar with URL rules, shows only when needed */}
        {(filter.condition?.includes("any") || filter.condition?.includes("all")) && (
          <Text style={filterStyles.text}>Pro tip: use a comma to separate the values :)</Text>
        )}

      </View>
    </View>
  )
}
