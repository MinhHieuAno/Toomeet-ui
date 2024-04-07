"use client";
import SettingSwitchItem from "../setting/SettingSwitchItem";

type Props = {};

const SecuritySettingForm = (props: Props) => {
    return (
        <div>
            <div>
                <SettingSwitchItem
                    onDeactive={() => {
                        return true;
                    }}
                    onActive={() => {
                        return true;
                    }}
                >
                    Xác thực 2 bước
                </SettingSwitchItem>
            </div>
        </div>
    );
};

export default SecuritySettingForm;
