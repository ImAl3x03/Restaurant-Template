import {useState, useMemo, useCallback} from 'react';
import {MenuItem, TextField} from '@mui/material';

/**************************************************************
 ****** DEFINITION OF OBJECT FOR THE RESTAURANT BUILDING ******
 **************************************************************/
interface buildAvailable {
    id: number;
    branchName: string;
    src: string;
}

const build: buildAvailable[] = [
    {
        id: 1,
        branchName: "Sapureat, Napoli",
        src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3013.690671069271!2d14.267957215693082!3d40.94444613129874!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x133b074ea0191351%3A0x6d36bdbe93d04f39!2sSapureat!5e0!3m2!1sen!2suk!4v1641071563989!5m2!1sen!2suk"
    },
    {
        id: 2,
        branchName: "Pizzeria Pellone",
        src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3017.715675008795!2d14.271939715691039!3d40.856165836719576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x133b08109efacacd%3A0x6aa3c2098c708387!2sPizzeria%20Pellone!5e0!3m2!1sen!2suk!4v1641076118923!5m2!1sen!2suk"
    }
]

export default function Map() {
    //useState for selecting the building
    const [selectedBuild, setSelectedBuild] = useState("1");

    //Change the selected building
    const selectedBuildHandler = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedBuild(event.target.value);
    }, [selectedBuild]);

    //Selected building object
    const b: buildAvailable = useMemo(() => {
        return build[parseInt(selectedBuild) - 1]
    }, [selectedBuild])

    return (
        <div className='min-w-[300px] w-[90%] py-[30px]'>
            <div className="flex justify-center">
                <TextField
                    id="select-branch"
                    variant="standard"
                    label="I nostri locali"
                    select
                    value={selectedBuild}
                    onChange={selectedBuildHandler}
                >
                    {build.map((option) =>
                        <MenuItem key={option.id} value={option.id}>
                            {option.branchName}
                        </MenuItem>
                    )}
                </TextField>
            </div>

            {
                <iframe
                    className='w-[600px] h-[450px] pt-[20px]'
                    src={b.src}
                    allowFullScreen={true}
                    loading="lazy"/>
            }
        </div>
    );
}