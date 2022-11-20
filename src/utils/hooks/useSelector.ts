import { TypedUseSelectorHook, useSelector } from "react-redux";
import type { rootState } from "../../store/store";

const useAppSelector: TypedUseSelectorHook<rootState> = useSelector;

export default useAppSelector;
