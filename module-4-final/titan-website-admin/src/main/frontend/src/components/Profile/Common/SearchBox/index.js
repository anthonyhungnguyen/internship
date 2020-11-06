import { Input, Select } from "antd"
import React from "react"

const Option = { Select }
const Search = { Input }

export default function SearchBox({
    type,
    id,
    handleTypeChange,
    handleSearch,
    handleIDChange,
}) {
    return (
        <Search
            addonBefore={
                <Select
                    defaultValue={type}
                    style={{ width: 100 }}
                    onChange={handleTypeChange}
                >
                    <Option value='device' disabled>
                        Device
                    </Option>
                    <Option value='user'>User</Option>
                    <Option value='card' disabled>
                        Card
                    </Option>
                </Select>
            }
            value={id}
            defaultValue={id}
            placeholder='enter id here'
            onChange={handleIDChange}
            onSearch={handleSearch}
            size='large'
            enterButton
        />
    )
}
