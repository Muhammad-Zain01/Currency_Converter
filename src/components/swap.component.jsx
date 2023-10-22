import { Button } from "antd"
import { SwapOutlined } from "@ant-design/icons"

const SwapButton = ({onClick}) => {
    return (
        <div className='swap-button'>
            <Button icon={<SwapOutlined />} onClick={onClick}></Button>
        </div>
    )
}

export default SwapButton;