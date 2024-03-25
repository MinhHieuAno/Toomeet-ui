import React from "react";

type Props = {};

const page = (props: Props) => {
    return (
        <div className="w-full">
            <div className="w-full h-96 rounded-xl">
                <img
                    className="w-full object-cover h-full rounded-[inherit]"
                    src="https://scontent.fsgn21-1.fna.fbcdn.net/v/t39.30808-6/327308063_5738849746233725_6865431685536213977_n.jpg?stp=dst-jpg_s960x960&_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFkdm6OIH37b7_RQsiHPEkJmfWmYFtqzsaZ9aZgW2rOxnbaFXSYKFYDmlwlL8aSPRyBK4FMiy4TxI8m3NiyzLEi&_nc_ohc=9KBMtOjaUTcAX80cD9A&_nc_ht=scontent.fsgn21-1.fna&oh=00_AfDsTieaRI6Hrv2HbL7dlJxKEBu5CWtFusfhE9JPSLw7UQ&oe=6603449B"
                    alt=""
                />
            </div>
        </div>
    );
};

export default page;
