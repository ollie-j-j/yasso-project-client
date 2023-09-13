import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
  import { BoltIcon } from "@heroicons/react/24/outline";
  import { Link } from "react-router-dom";
   
  const colors = {
    orange: "bg-orange-50 text-orange-500",
  };
  
function LearnCard({color = 'orange'}) {
    return (
      <Card className="mt-6 w-96 text-left">
        <CardBody>
        <BoltIcon className={`rounded-lg p-2 h-[50px] w-[50px] mb-4 ${colors[color]}`} />
          <Typography variant="h5" color="blue-gray" className="mb-2">
            learn
          </Typography>
          <Typography>
            learn how to improve your running with these resources
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <a href="#" className="inline-block">
            <Link to="/learn">
              <Button size="sm" variant="text" className="flex items-center gap-2 lowercase text-sm">
                Learn More
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
          </a>
        </CardFooter>
      </Card>
    );
  }

  export default LearnCard;