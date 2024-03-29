import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
  import { StarIcon } from "@heroicons/react/24/outline";
  import { Link } from "react-router-dom";

  const colors = {
    blue: "bg-blue-50 text-blue-500",
  };
   
function DashboardCard({color = 'blue'}) {
    return (
      <Card className="mt-6 w-96 text-left">
        <CardBody>
        <StarIcon className={`rounded-lg p-2 h-[50px] w-[50px] mb-4 ${colors[color]}`} />
          <Typography variant="h5" color="blue-gray" className="mb-2">
            dashboard
          </Typography>
          <Typography>
            take a look a look at some data from your runs this week and read your training notes
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
            <Link to="/dashboard">
                <Button size="sm" variant="text" className="flex items-center gap-2 lowercase text-sm">
                  view dashboard
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                    />
                  </svg>
                </Button>
            </Link>
        </CardFooter>
      </Card>
    );
  }

  export default DashboardCard;