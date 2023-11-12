import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import UnAuthorized from "../../UnAuthorized"

const Home = () => {
  // const { currentUser, setCurrentUser, errorPage } = useContext(AuthContext);
  const [showTopSub, setShowTopSub] = useState(false);
  const [isPage401, setIsPage401] = useState(false);


  // unauthorized page
  // useEffect(() => {
  //   if (errorPage) {
  //     setIsPage401(true);
  //   }
  // }, [errorPage]);

  return (
    <div className={isPage401 ? "home unauthorized" : "home"}>
      <p>Hello</p>
      {/* {showTopSub && <TopSub />}
      <Sidebar />
      <Main /> */}
      {/* {isPage401 && (
        <UnAuthorized
          setIsPage401={setIsPage401}
          setCurrentUser={setCurrentUser}
        />
      )} */}
    </div>
  );
};

export default Home;
