import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { Navigate } from "react-router-dom";
import { Spinner } from "@material-tailwind/react";

function IsAnon({ children }) {

  const { isLoggedIn, isLoading } = useContext(AuthContext);

  // If the authentication is still loading 
  if (isLoading) return (

    <div className="spinner-container">
      <Spinner className="h-10 w-10" />
    </div>
  );

  if (isLoggedIn) {
    // If the user is logged in, navigate to the home page     
    return <Navigate to="/" />;
  } else {
    // If the user is not logged in, allow to see the page 
    return children;
  }
}

export default IsAnon;