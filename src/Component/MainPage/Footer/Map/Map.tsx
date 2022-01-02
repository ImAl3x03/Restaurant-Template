import { useState } from 'react';

import { MenuItem, TextField } from '@mui/material';
import branchesAvailable from '../../../../Model/branchesAvailable'
import OptionBranches from './OptionsBranches.json'

//interface Props {    branch: number,}

export default function Map() {
    const [selectedBranch, setSelectedBranch] = useState("1");
    const branches: branchesAvailable[] = OptionBranches  //info in JSON file

    const selectedBranchHandler =(event:React.ChangeEvent<HTMLInputElement>)=>{
        setSelectedBranch(event.target.value)
    };

    return (

        <div>
            <TextField
                id="select-branch"
                variant="standard"
                label="Choose Branch"
                select
                value = {selectedBranch}
                onChange={selectedBranchHandler}
            >
                {branches.map((option)=>
                    <MenuItem key = {option.id} value={option.id}>
                        {option.branchName}
                    </MenuItem>
                )}
            </TextField>
            {
                branches.map((b) => {
                    if (b.id === parseInt(selectedBranch)) {
                        return (
                            <iframe
                                src={b.src}
                                width="600"
                                height="450"
                                allowFullScreen={true}
                                loading="lazy"/>
                            )}
                            //style={{ border: "0" }} the style needs to be tested, only works with 0 or another number
                })}
        </div>
    );
}