import React from "react";

type Props = {};

const page = (props: Props) => {
    return (
        <div className="w-full">
            <div className="w-full h-96 rounded-xl">
                <img
                    className="w-full object-cover h-full rounded-[inherit]"
                    src={
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReho36xCUc2p9CgonEjrd-RpQ3OhHmZHQD3AlUrGvUGgmiVXgUNLL1_68elBmhF_7H6is&usqp=CAU"
                    }
                    alt=""
                />
            </div>
        </div>
    );
};

export default page;
