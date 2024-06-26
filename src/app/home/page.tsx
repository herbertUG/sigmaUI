"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Textarea } from "@/components/ui/textarea";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import axios from "axios";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import Router from "next/router";
import { useEffect,useState } from "react";

export default function Home() {

  const [data, setData] = useState([]);

  const url = "http://localhost:8080/api/v1";

  const formSchema = z.object({
    firstName: z.string().min(2, {
      message: "Firstname must be at least 3 characters.",
    }),
    lastName: z.string().min(2, {
      message: "Lastname must be at least 3 characters.",
    }),
    phoneNumber: z.string().min(10, {
      message: "Phone number must be at least 10 characters.",
    }),
    email: z.string().email(),
    linkedIn: z.string(),
    github: z.string(),
    avaliability: z.string(),
    comments: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // defaultValues: {
    //   username: "",
    // },
  });

  const submitInfo = async () => {
    await axios
      .post(`${url}/candidates`, JSON.stringify(form.getValues()),{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then((response) => {
        Router.push("/home");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const getCandidates = async () => {
    await axios
      .get(`${url}/candidates`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
    )
      .then((response) => {
        console.log(response?.data.data.allCandidates)
        setData(response?.data.data.allCandidates);

      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    getCandidates();
  }, []
)

  return (
    <>
      <main className="flex-1">
        <div className="grid items-center gap-8 pb-8 pt-6 md:py-8 container">
          <Card x-chunk="flex h-full min-h-screen w-full flex-col">
            <CardHeader>
              <CardTitle>Candidates</CardTitle>
              <CardDescription>
                <div className="flex flex-row justify-between">
                  <div>Manage your Candidates and view</div>
                  <div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">Add new Candidate</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>New Candidate</DialogTitle>
                          <DialogDescription>
                            Enter candidate details
                          </DialogDescription>
                        </DialogHeader>
                        <Form {...form}>
                          <form
                            // onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6"
                          >
                            <div className="grid grid-cols-2 gap-4">
                              <div className="grid gap-2">
                                <FormField
                                  control={form.control}
                                  name="firstName"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>First name</FormLabel>
                                      <FormControl>
                                        <Input
                                          placeholder="firstname"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                              <div className="grid gap-2">
                                <FormField
                                  control={form.control}
                                  name="lastName"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Last name</FormLabel>
                                      <FormControl>
                                        <Input
                                          placeholder="last name"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </div>
                            <div className="grid gap-2">
                              <FormField
                                control={form.control}
                                name="phoneNumber"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="phoneNumber"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            <div className="grid gap-2">
                              <FormField
                                control={form.control}
                                name="avaliability"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Avaliability</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="avaliability"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            <div className="grid gap-2">
                              <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                      <Input placeholder="email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="grid gap-2">
                                <FormField
                                  control={form.control}
                                  name="linkedIn"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>LinkedIn</FormLabel>
                                      <FormControl>
                                        <Input
                                          placeholder="linkedIn"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                              <div className="grid gap-2">
                                <FormField
                                  control={form.control}
                                  name="github"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Github</FormLabel>
                                      <FormControl>
                                        <Input
                                          placeholder="github"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </div>

                            <div className="grid gap-2">
                              <FormField
                                control={form.control}
                                name="comments"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Comment</FormLabel>
                                    <FormControl>
                                      <Textarea placeholder="Type your comment here."  {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </form>
                        </Form>

                        <DialogFooter>
                          <Button type="button" onClick={() => submitInfo()}>
                            Save changes
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Phone Number</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Email
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Avaliability
                    </TableHead>
                    <TableHead>LinkedIn</TableHead>
                    <TableHead>Github</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Created at
                    </TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="overflow-y-auto h-[500px] ">
                  {
                    data?.map((candidate, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            {candidate.firstName} {candidate.lastName}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{candidate.phoneNumber}</Badge>
                          </TableCell>
                          <TableCell>{candidate.email}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            {candidate.avaliability}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {candidate.linkedIn}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {candidate.github}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {candidate.createdAt}
                          </TableCell>
                        </TableRow>
                      );
                    })
                  }
                
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
        </div>
      </main>
    </>
  );
}
