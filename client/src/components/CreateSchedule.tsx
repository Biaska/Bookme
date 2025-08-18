import { useState } from "react"
import { useTimezoneSelect, allTimezones } from 'react-timezone-select'
import ToolTip from "../components/ToolTip";
import useToast from "../hooks/useToast";
import { APIMethods, useAPI } from "../hooks/useApi";

const days = ["S", "M", "T", "W", "T", "F", "S"]

interface DayBubbleProps {
    letter: string,
    onToggle: () => void,
}

interface CreateScheduleProps {
    serviceID: number,
}

const DayBubble:React.FC<DayBubbleProps> = ({letter, onToggle}) => {
    const [isToggled, setIsToggled] = useState(false);

    const handleToggle = () => {
        setIsToggled(!isToggled);
        onToggle();
    }

    return(
        <div 
            id={isToggled.toString()} 
            onClick={() => handleToggle()} 
            className="day-bubble"
            >
            {letter}
        </div>
    )
}

const CreateSchedule: React.FC<CreateScheduleProps> = ({serviceID}) => {
    const [daysState, setDaysState] = useState<boolean[]>([false, false, false, false, false, false, false]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [selectedTimezone, setSelectedTimezone] = useState(
        Intl.DateTimeFormat().resolvedOptions().timeZone
      );
    const [Toast, setToast] = useToast()
    const [api, response] = useAPI()

    const labelStyle = 'original'
    const timezones = {
    ...allTimezones,
    }


    const { options, parseTimezone } = useTimezoneSelect({ labelStyle, timezones })

    const handleToggle = (index: number) => {
        setDaysState((prev) => {
            const newState = [...prev];
            newState[index] = !newState[index];
            return newState;
        });
    };

    const setTimezone = (timezone:any) => {
        setSelectedTimezone(timezone.abbrev)
    }

    const handleSubmit = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        console.log(selectedTimezone);
        const data = {
            servicId: serviceID,
            monday: daysState[1],
            tuesday: daysState[2],
            wednesday: daysState[3],
            thursday: daysState[4],
            friday: daysState[5],
            saturday: daysState[6],
            sunday: daysState[0],
            startDate,
            endDate,
            startTime,
            endTime,
            timezone: selectedTimezone,
        }
        if (api.schedules) {
            const schedule = api.schedules as APIMethods;
            await schedule.post(data);
        }
        if (response.status === 200) {
            console.log(response.data);
            setToast("Schedule Created");
        }
    }

    return(
        <form action="">
            <div className="day-bubble-selection">
            {days.map((day, id) => (
                <DayBubble 
                    key={id} 
                    letter={day}
                    onToggle={() => handleToggle(id)}
                    />
            ))}
            </div>
            <div className="input-group">
                <div className="label-group">
                    <label htmlFor="start-date">Start Date: </label>
                </div>
                <input type="date" id="start-date" onChange={(e)=>setStartDate(e.target.value)}/>
            </div>
            <div className="input-group">
                <div className="label-group">
                    <label htmlFor="end-date">End Date: </label>
                </div>
                <input type="date" id="end-date" onChange={(e)=>setEndDate(e.target.value)}/>
            </div>
            <div className="input-group">
                <div className="label-group">
                    <label htmlFor="start-time">Start Time: </label>
                </div>
                <input type="time" id="start-time" onChange={(e)=>setStartTime(e.target.value + ":00")}/>
            </div>
            <div className="input-group">
                <div className="label-group">
                    <label htmlFor="end-time">End Time: </label>
                </div>
                <input type="time" id="end-time" onChange={(e)=>setEndTime(e.target.value + ":00")}/>
            </div>
            <div className="input-group">
                <div className="label-group">
                    <label htmlFor="zip">Timezone<ToolTip tooltipText="Setting your timezone will change what timezone your services will be presented in."/></label>
                </div>
                <div className="select-wrapper">
                    <select 
                        onChange={e => 
                        setTimezone(parseTimezone(e.currentTarget.value))}>
                    {options.map((option, id) => (
                        <option key={id} value={option.value}>{option.label}</option>
                    ))}
                    </select>
                </div>
            </div>
            <button onClick={(e)=>handleSubmit(e)}>Submit</button>
            <Toast />
        </form>
    )
}

export default CreateSchedule