import { Select } from "antd"

const SelectBox = ({data , onChange, value}) => {
    const countryCodes = data && Object.keys(data).map(keys => ({value: keys, label: `${data[keys]} - ( ${keys} ) `}))

    const filterOption = (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());


    return (
        <Select
            className="currency-select"
            showSearch
            onChange={onChange}
            filterOption={filterOption}
            options={countryCodes}
            value={value}
        />
    )
}

export default SelectBox;