import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { setExpense } from "../slice/trackerSlice";

export const getTrackerData = (userId) => async (dispatch) => {
    try {
        if (userId) {
            const docRef = doc(db, "tracker", userId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                dispatch(setExpense(docSnap.data().data || []))
            } else {
                console.log("No such document!");
            }
        }

    } catch (error) {
        console.error(error)
    }


}