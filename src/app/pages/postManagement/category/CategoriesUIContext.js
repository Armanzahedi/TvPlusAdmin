import React, {createContext, useContext, useState, useCallback} from "react";
import {isEqual, isFunction} from "lodash";
import {initialFilter} from "./CategoriesUIHelpers";

const CategoriesUIContext = createContext();

export function useCategoriesUIContext() {
  return useContext(CategoriesUIContext);
}

export const CategoriesUIConsumer = CategoriesUIContext.Consumer;

export function CategoriesUIProvider({categoriesUIEvents, children}) {
  const [queryParams, setQueryParamsBase] = useState(initialFilter);
  const [ids, setIds] = useState([]);
  const setQueryParams = useCallback(nextQueryParams => {
    setQueryParamsBase(prevQueryParams => {
      if (isFunction(nextQueryParams)) {
        nextQueryParams = nextQueryParams(prevQueryParams);
      }

      if (isEqual(prevQueryParams, nextQueryParams)) {
        return prevQueryParams;
      }

      return nextQueryParams;
    });
  }, []);

  const initCategory = {
    id: undefined,
    firstName: "",
    lastName: "",
    email: "",
    userName: "",
    gender: "Female",
    status: 0,
    dateOfBbirth: "",
    ipAddress: "",
    type: 1
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initCategory,
    newCategoryButtonClick: categoriesUIEvents.newCategoryButtonClick,
    openEditCategorieDialog: categoriesUIEvents.openEditCategorieDialog,
    openDeleteCategorieDialog: categoriesUIEvents.openDeleteCategorieDialog,
    openDeleteCategoriesDialog: categoriesUIEvents.openDeleteCategoriesDialog,
    openFetchCategoriesDialog: categoriesUIEvents.openFetchCategoriesDialog,
    openUpdateCategoriesStatusDialog: categoriesUIEvents.openUpdateCategoriesStatusDialog
  };

  return <CategoriesUIContext.Provider value={value}>{children}</CategoriesUIContext.Provider>;
}