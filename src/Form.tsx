import { useState } from "react";
import { Button } from "./components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";

const endpoint = "https://rsvp-server-0e6c1aeed2e7.herokuapp.com/";
const celebrityPlaceholders = [
  { firstName: "Belcalis", lastName: "Almanzar" },
  { firstName: "Aubrey", lastName: "Graham" },
  { firstName: "Kim", lastName: "Kardashian" },
  { firstName: "Dwayne", lastName: "Johnson" },
  { firstName: "Beyoncé", lastName: "Knowles" },
  { firstName: "Rihanna", lastName: "Fenty" },
  { firstName: "Shawn", lastName: "Carter" },
];

interface User {
  firstName: string;
  lastName: string;
  touched: {
    firstName: boolean;
    lastName: boolean;
  };
}

export default function Form() {
  const [users, setUsers] = useState<User[]>([
    {
      firstName: "",
      lastName: "",
      touched: { firstName: false, lastName: false },
    },
  ]);

  const addUser = () => {
    setUsers([
      ...users,
      {
        firstName: "",
        lastName: "",
        touched: { firstName: false, lastName: false },
      },
    ]);
  };

  const removeUser = (index: number) => {
    const newUsers = [...users];
    newUsers.splice(index, 1);
    setUsers(newUsers);
  };

  const isInvalid = (name: string) => name.trim().length === 0;

  const anyInvalid = users.some(
    (user) =>
      (user.touched.firstName && isInvalid(user.firstName)) ||
      (user.touched.lastName && isInvalid(user.lastName)),
  );

  const handleInputChange = (index: number, field: string, value: string) => {
    const newUsers = [...users];
    const thisUser = newUsers[index];
    if (field === "firstName" || field === "lastName") {
      thisUser[field] = value;
      thisUser.touched[field] = true;
    }
    setUsers(newUsers);
  };

  const handleSubmitClick = (e: React.FormEvent<HTMLButtonElement>) => {
    // Set all fields as touched
    const newUsers = [...users];
    newUsers.forEach((user) => {
      user.touched.firstName = true;
      user.touched.lastName = true;
    });
    setUsers(newUsers);
    if (anyInvalid) {
      e.preventDefault();
    } else {
      const names = users.map((user) => ({
        firstName: user.firstName,
        lastName: user.lastName,
      }));

      fetch(`${endpoint}rsvp/halloween2024`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(names),
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">RSVP</Button>
      </DialogTrigger>
      <DialogContent className="bg-black text-white sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Whose Coming?</DialogTitle>
          <DialogDescription>
            Enter the names of everyone attending.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 ">
          {users.map((user, index) => (
            <div key={index}>
              {index !== 0 && (
                <hr key="divider" className="border-slate-850 border-t" />
              )}
              <div className="relative grid gap-3 pt-4">
                {index !== 0 && (
                  <button
                    type="button"
                    className="top-50 absolute right-0 text-red-500"
                    onClick={() => removeUser(index)}
                  >
                    &times;
                  </button>
                )}
                <div className="grid grid-cols-4 items-center gap-4 pe-6">
                  <Label htmlFor={`first-name-${index}`} className="text-right">
                    First Name
                  </Label>
                  <Input
                    id={`first-name-${index}`}
                    placeholder={celebrityPlaceholders[index].firstName}
                    className="col-span-3"
                    isInvalid={
                      user.touched.firstName && isInvalid(user.firstName)
                    }
                    value={user.firstName}
                    onChange={(e) =>
                      handleInputChange(index, "firstName", e.target.value)
                    }
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4 pe-6">
                  <Label htmlFor={`last-name-${index}`} className="text-right">
                    Last Name
                  </Label>
                  <Input
                    id={`last-name-${index}`}
                    placeholder={celebrityPlaceholders[index].lastName}
                    className="col-span-3"
                    isInvalid={
                      user.touched.lastName && isInvalid(user.lastName)
                    }
                    value={user.lastName}
                    onChange={(e) =>
                      handleInputChange(index, "lastName", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <Button
          variant="outline"
          className="w-full text-black"
          onClick={addUser}
        >
          + Add Another
        </Button>
        <DialogFooter>
          <Button
            type="submit"
            disabled={anyInvalid}
            onClick={handleSubmitClick}
            className="w-full bg-red-700 text-white"
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
