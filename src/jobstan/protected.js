import {useSelector} from "react-redux";
import {Navigate} from "react-router";

const ProtectedRoute = ({children}) => {
    const {currentUser} = useSelector((state) => state.users)
    if (!currentUser) {
        return (<Navigate to={'/login'}/>)
    } else {
        console.log("passed protection")
        return (children)
    }
}
export default ProtectedRoute