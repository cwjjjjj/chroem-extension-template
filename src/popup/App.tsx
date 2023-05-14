import {
  BrowserRouter,
  Route,
  Routes,
  MemoryRouter,
  createMemoryRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from "./components/Layout";
import Mine from "./pages/Mine";
import Explore from "./pages/Explore";
import Follow from "./pages/Follow";
import Login from "./pages/Login";
import User from "./pages/User";
import ProfileSetting from "./pages/ProfileSetting";

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "explore", element: <Explore /> },
      { path: "mine", element: <Mine /> },
      { path: "follow", element: <Follow /> },
      { path: "user/:id/:name", element: <User /> },
      { path: "profile-setting", element: <ProfileSetting /> },
    ],
  },
];

export const router = createMemoryRouter(routes, {
  initialEntries: ["/", "/explore"],
  initialIndex: 1,
});

function App() {
  return (
    <RouterProvider router={router} />
    // <MemoryRouter basename="/" initialEntries={["/explore"]}>
    //   <Routes>
    //     <Route path="/" element={<Layout />}>
    //       <Route path="login" element={<Login />} />
    //       <Route path="explore" element={<Explore />} />
    //       <Route path="mine" element={<Mine />} />
    //       <Route path="follow" element={<Follow />} />
    //       <Route path="user/:id/:name" element={<User />} />
    //       <Route path="profile-setting" element={<ProfileSetting />} />
    //     </Route>
    //   </Routes>
    // </MemoryRouter>
  );
}

export default App;
