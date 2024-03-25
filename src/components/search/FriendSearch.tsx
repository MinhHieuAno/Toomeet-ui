"use client";
import React, {
    ChangeEvent,
    FC,
    ReactNode,
    forwardRef,
    useContext,
    useEffect,
    useState,
} from "react";
import { Input, InputProps } from "../ui/input";
import useDebounce from "@/hooks/useDebounce";
import { Friend, mockFriends } from "@/lib/friend.utils";
import { useToast } from "../ui/use-toast";
import api from "@/lib/api";
import { sleep } from "@/lib/utils";

interface IFriendSearchContext {
    results: Friend[];
    handleSearch: (keyword: string) => Promise<void>;
    isLoading: boolean;
}
const FriendSearchContext = React.createContext<IFriendSearchContext | null>(
    null
);

type FriendSearchProps = {
    children: ReactNode;
};

const FriendSearch: FC<FriendSearchProps> = ({ children }) => {
    const [results, setResults] = useState<Friend[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const { toast } = useToast();

    const handleSearch = async (keyword: string) => {
        try {
            setLoading(true);
            let response;
            if (keyword.trim()) {
                response = await api("/users/friends/search", {
                    params: {
                        p: 0,
                        l: 10,
                        keyword,
                    },
                });
            } else {
                response = await api("/users/friends", {
                    params: { p: 0, l: 10 },
                });
            }
            const data = response.data;
            setResults(data.content);
        } catch (error: any) {
            console.log(error);
            toast({
                title: "Lỗi",
                description: error,
            });
        }
        setLoading(false);
    };

    return (
        <FriendSearchContext.Provider
            value={{ results, isLoading: loading, handleSearch }}
        >
            {children}
        </FriendSearchContext.Provider>
    );
};

const FriendSearchInput = forwardRef<HTMLInputElement, InputProps>(
    (props, ref) => {
        const [keyword, setKeyword] = useState<string>("");
        const { handleSearch } = useFriendSearch();
        const keywordDebounce = useDebounce(keyword, 800);

        useEffect(() => {
            handleSearch(keywordDebounce);
        }, [keywordDebounce]);

        const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
            props.onChange?.(e);
            setKeyword(e.target.value);
        };

        return (
            <Input
                ref={ref}
                placeholder="Tìm kiếm bạn bè"
                {...props}
                onChange={handleChangeInput}
            ></Input>
        );
    }
);

type FriendSearchResultProps = {
    render: ({
        results,
        isLoading,
    }: {
        results: Friend[];
        isLoading: boolean;
    }) => ReactNode;
};
const FriendSearchResult: FC<FriendSearchResultProps> = ({ render }) => {
    const { results, isLoading } = useFriendSearch();
    return <>{render({ results, isLoading })}</>;
};

const useFriendSearch = () => {
    const context = useContext(FriendSearchContext);
    if (typeof context === "undefined" || !context) {
        throw new Error("useFriendSearch must be used within FriendSearch");
    }
    return context;
};

export { FriendSearch, FriendSearchInput, FriendSearchResult, useFriendSearch };
