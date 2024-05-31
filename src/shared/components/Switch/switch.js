import { ConfigProvider, Switch } from 'antd'
import React from 'react'

function CustomSwitch(props) {
    const {
        checkedChildren,
        unCheckedChildren,
        size
    } = props

    const unCheckedChildrenContent = () => {
        if (unCheckedChildren === "No") {
            return (
                <div className={size === "lg" && 'mt-[-22.5px] text-[19px] mr-2 text-right'}>No</div>
            )
        }
    }

    const checkedChildrenContent = () => {
        // if (unCheckedChildren === "Yes")
        return (
            <div className={size === "lg" &&'items-center text-left ml-1.5 mt-1.5 text-[19px]'}>Yes</div>
        )
    }


    return (
        <div className={""}>
            {size === "lg" ? <ConfigProvider
                theme={{
                    components: {
                        Switch: {
                            handleSize: 26,
                            trackPadding: 4.5,
                            colorPrimary: '#00cc17',
                            colorPrimaryHover: "#3fe752"
                        },
                    },
                }}
            >

                <Switch className={`bg-[#ABB2B9] ${size === "lg" && "h-[2.2rem] w-[5.2rem]"}`}
                    checkedChildren={checkedChildren ? checkedChildrenContent() : ""}
                    unCheckedChildren={unCheckedChildren ? unCheckedChildrenContent() : ""}
                />
            </ConfigProvider> :
                <Switch className={`bg-[#ABB2B9]`}
                    checkedChildren={checkedChildren ? checkedChildrenContent() : ""}
                    unCheckedChildren={unCheckedChildren ? unCheckedChildrenContent() : ""}
                />
            }
        </div>
    )
}

export default CustomSwitch
