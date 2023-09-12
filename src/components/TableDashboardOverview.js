import { Card, Typography } from "@material-tailwind/react";
import AerobicPopover from "./AerobicPopover";

function TableDashboardOverview({ data }) {

  const {
    totalDistanceCompleted,
    totalDistance,
    sessionsCompleted,
    missedSessions,
    aerobicTotalPercentage,
    pendingSessions
  } = data;

  const TABLE_HEAD = ["insight", "data"];

  const TABLE_ROWS = [
    {
      insight: "total distance (miles)",
      data: `${totalDistanceCompleted} out of ${totalDistance}`,
    },
    {
      insight: "sessions completed",
      data: sessionsCompleted,
    },
    {
      insight: "missed sessions",
      data: missedSessions,
    },
    {
      insight: "% aerobic miles",
      data: `${aerobicTotalPercentage}%`,
    },
    {
      insight: "# pending sessions",
      data: pendingSessions,
    },
  ];

  return (
    <Card className="h-full w-3/4 mx-auto min-w-max table-auto text-left mt-8">
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
          {TABLE_ROWS.map(({ insight, data }, index) => {
            const isLast = index === TABLE_ROWS.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            return (
              <tr key={insight}>
                <td className={classes}>
                  {insight === "% aerobic miles" ? (
                    <AerobicPopover text={insight} />
                  ) : (
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {insight}
                    </Typography>
                  )}
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {data}
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

export default TableDashboardOverview;