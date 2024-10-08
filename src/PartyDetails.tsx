import { Button } from "./components/ui/button";
import { AddToCalendarButton } from "add-to-calendar-button-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog";

export default function PartyDetails() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Details</Button>
      </DialogTrigger>
      <DialogContent className="bg-black text-white sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>👻 Spookfest 2024</DialogTitle>
          <DialogDescription>
            Saturday October 26th, 2024 @ 7:00 PM
          </DialogDescription>
        </DialogHeader>
        <DialogDescription>
          Parking: On the street
          <br />
          Costumes: Encouraged
          <br />
          Drinks: We have some but BYOB is always welcome
          <br />
          Food: We will have some snacks but feel free to bring something to!
        </DialogDescription>

        <DialogFooter>
          <AddToCalendarButton
            name="Spookfest on Sunridge"
            options={["Apple", "Google"]}
            location="4400 Sunridge Drive, Loveland, CO 80538"
            description="Join us for the most anticipated event of the year[br]- Parking on the street[br]- Costumes encouraged[br]Can't wait to see you there!"
            startDate="2024-10-26"
            endDate="2024-10-27"
            startTime="19:00"
            endTime="01:00"
            sequence={0}
            lightMode="bodyScheme"
            timeZone="America/Denver"
          ></AddToCalendarButton>{" "}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
