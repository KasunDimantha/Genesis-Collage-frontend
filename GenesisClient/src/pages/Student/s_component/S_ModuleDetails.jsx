import React from "react";
import { useWorkoutsContext } from "../../../hooks/useWorkoutContext";
import { useAuthContext } from "../../../hooks/useAuthContext";

import formatDistanceToNow from "date-fns/formatDistanceToNow";

function S_ModuleDetails({ module }) {
    const { dispatch } = useWorkoutsContext();
    const { user } = useAuthContext();

    

    return (
        <div>
            <h4 className=" bg-slate-400 rounded-lg mt-2 pl-3" > ID : {module.module[0]._id}</h4>
            <h4 className=" bg-slate-400 rounded-lg mt-2 pl-3" > Module ID : {module.module[0].module_id}</h4>
            <h4 className=" bg-slate-400 rounded-lg mt-2 pl-3" > Module Name : {module.module[0].module_name}</h4>
        </div>
    )
}


 
export default S_ModuleDetails;