import categoryTableMock from "./categoryTableMock";
import MockUtils from "./mock.utils";

export default function mockCategory(mock) {
  mock.onPost("api/categories").reply(({ data }) => {
    const { category } = JSON.parse(data);
    const {
      firstName = "",
      lastName = "",
      email = "",
      userName = "",
      gender = "Female",
      status = 0,
      dateOfBbirth = "01/01/2019",
      ipAddress = "127.0.0.1",
      type = 1
    } = category;

    const id = generateUserId();
    const newCategory = {
      id,
      firstName,
      lastName,
      email,
      userName,
      gender,
      status,
      dateOfBbirth,
      ipAddress,
      type
    };
    categoryTableMock.push(newCategory);
    return [200, { category: newCategory }];
  });

  mock.onPost("api/categories/find").reply(config => {
    const mockUtils = new MockUtils();
    const { queryParams } = JSON.parse(config.data);
    const filterdCategories = mockUtils.baseFilter(
      categoryTableMock,
      queryParams
    );
    return [200, filterdCategories];
  });

  mock.onPost("api/categories/deleteCategories").reply(config => {
    const { ids } = JSON.parse(config.data);
    ids.forEach(id => {
      const index = categoryTableMock.findIndex(el => el.id === id);
      if (index > -1) {
        categoryTableMock.splice(index, 1);
      }
    });
    return [200];
  });

  mock.onPost("api/categories/updateStatusForCategories").reply(config => {
    const { ids, status } = JSON.parse(config.data);
    categoryTableMock.forEach(el => {
      if (ids.findIndex(id => id === el.id) > -1) {
        el.status = status;
      }
    });
    return [200];
  });

  mock.onGet(/api\/categories\/\d+/).reply(config => {
    const id = config.url.match(/api\/categories\/(\d+)/)[1];
    const category = categoryTableMock.find(el => el.id === +id);
    if (!category) {
      return [400];
    }

    return [200, category];
  });

  mock.onPut(/api\/categories\/\d+/).reply(config => {
    const id = config.url.match(/api\/categories\/(\d+)/)[1];
    const { category } = JSON.parse(config.data);
    const index = categoryTableMock.findIndex(el => el.id === +id);
    if (!index) {
      return [400];
    }

    categoryTableMock[index] = { ...category };
    return [200];
  });

  mock.onDelete(/api\/categories\/\d+/).reply(config => {
    const id = config.url.match(/api\/categories\/(\d+)/)[1];
    const index = categoryTableMock.findIndex(el => el.id === +id);
    categoryTableMock.splice(index, 1);
    if (!index === -1) {
      return [400];
    }

    return [200];
  });
}

function generateUserId() {
  const ids = categoryTableMock.map(el => el.id);
  const maxId = Math.max(...ids);
  return maxId + 1;
}
