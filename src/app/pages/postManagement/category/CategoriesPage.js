import React from "react";
import { Route } from "react-router-dom";
import { CategoriesLoadingDialog } from "./categories-loading-dialog/CategoriesLoadingDialog";
import { CategoryEditDialog } from "./category-edit-dialog/CategoryEditDialog";
import { CategoryDeleteDialog } from "./category-delete-dialog/CategoryDeleteDialog";
import { CategoriesDeleteDialog } from "./categories-delete-dialog/CategoriesDeleteDialog";
import { CategoriesFetchDialog } from "./categories-fetch-dialog/CategoriesFetchDialog";
import { CategoriesUpdateStateDialog } from "./categories-update-status-dialog/CategoriesUpdateStateDialog";
import { CategoriesUIProvider } from "./CategoriesUIContext";
import { CategoriesCard } from "./CategoriesCard";

const CategoriesPage = ({ history }) => {
  const categoriesUIEvents = {
    newCategoryButtonClick: () => {
      history.push("/postManagement/category/new");
    },
    openEditCategoryDialog: (id) => {
      history.push(`/postManagement/category/${id}/edit`);
    },
    openDeleteCategoryDialog: (id) => {
      history.push(`/postManagement/category/${id}/delete`);
    },
    openDeleteCategoriesDialog: () => {
      history.push(`/postManagement/category/deleteCategories`);
    },
    openFetchCategoriesDialog: () => {
      history.push(`/postManagement/category/fetch`);
    },
    openUpdateCategoriesStatusDialog: () => {
      history.push("/postManagement/category/updateStatus");
    }
  }

  return (
    <CategoriesUIProvider categoriesUIEvents={categoriesUIEvents}>
      <CategoriesLoadingDialog />
      <Route path="/postManagement/category/new">
        {({ history, match }) => (
          <CategoryEditDialog
            show={match != null}
            onHide={() => {
              history.push("/postManagement/category");
            }}
          />
        )}
      </Route>
      <Route path="/postManagement/category/:id/edit">
        {({ history, match }) => (
          <CategoryEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/postManagement/category");
            }}
          />
        )}
      </Route>
      <Route path="/postManagement/category/deleteCategories">
        {({ history, match }) => (
          <CategoriesDeleteDialog
            show={match != null}
            onHide={() => {
              history.push("/postManagement/category");
            }}
          />
        )}
      </Route>
      <Route path="/postManagement/category/:id/delete">
        {({ history, match }) => (
          <CategoryDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/postManagement/category");
            }}
          />
        )}
      </Route>
      <Route path="/postManagement/category/fetch">
        {({ history, match }) => (
          <CategoriesFetchDialog
            show={match != null}
            onHide={() => {
              history.push("/postManagement/category");
            }}
          />
        )}
      </Route>
      <Route path="/postManagement/category/updateStatus">
        {({ history, match }) => (
          <CategoriesUpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/postManagement/category");
            }}
          />
        )}
      </Route>
      <CategoriesCard />
    </CategoriesUIProvider>
  );
}

export default CategoriesPage;