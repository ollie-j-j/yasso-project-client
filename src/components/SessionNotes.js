import { Card, Typography } from "@material-tailwind/react";

function SessionNotes({ data }) {
    console.log("Received data:", data);

    const DAYS_OF_WEEK = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

    const sessionNotesData = DAYS_OF_WEEK.map(dayOfWeek => {
        const dayData = data.data[dayOfWeek] || {};
        return {
            day: dayOfWeek,
            sessionNotes: dayData.sessionNotes || '',
            status: dayData.status || 'pending'
        };
    });

    const TABLE_ROWS = sessionNotesData;
    const TABLE_HEAD = ["day", "notes", "status"];

    return (
        <Card className="h-full w-full mx-auto min-w-max table-auto text-left mt-8 mb-24">
            <table>
                <thead>
                    <tr>
                        {TABLE_HEAD.map((head, idx) => (
                            <th
                                key={head}
                                className={`${idx === 0 ? "rounded-tl-lg" : idx === TABLE_HEAD.length - 1 ? "rounded-tr-lg" : ""
                                    } border-b border-gray-100 bg-gray-100 p-4`}
                            >
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none text-lg"
                                >
                                    {head}
                                </Typography>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {TABLE_ROWS.map(({ day, sessionNotes, status }, index) => {
                        const isLast = index === TABLE_ROWS.length - 1;
                        const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                        return (
                            <tr key={day}>
                                <td className={classes}>
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {day}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {sessionNotes}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {status}
                                    </Typography>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </Card>
    );
}

export default SessionNotes;

