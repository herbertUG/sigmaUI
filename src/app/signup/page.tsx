"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const url = "http://localhost:8080/api/v1";

  const router = useRouter();

  const formSchema = z.object({
    firstName: z.string().min(2, {
      message: "Firstname must be at least 3 characters.",
    }),
    lastName: z.string().min(2, {
      message: "Lastname must be at least 3 characters.",
    }),
    email: z.string().email({
      message: "Invalid email address.",
    }),
    password: z.string().min(10, {
      message: "Phone number must be at least 10 characters.",
    }),
    confirmPassword: z.string().min(10, {
      message: "Phone number must be at least 10 characters.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // defaultValues: {
    //   username: "",
    // },
  });

  const submitInfo = async () => {
    console.log(form.getValues());
    // formData should me JSON

    await axios
      .post(`${url}/auth/signup`, JSON.stringify(form.getValues()), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if(response.status === 201){
            router.push("/");
            }
        console.log(response);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div className="w-full max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                type="text"
                placeholder="John"
                required
                {...form.register("firstName")}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                type="text"
                placeholder="Doe"
                required
                {...form.register("lastName")}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder=""
                required
                {...form.register("email")}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                required
                {...form.register("password")}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="********"
                required
                {...form.register("confirmPassword")}
              />
            </div>
            <Button onClick={submitInfo} className="w-full">
              Sign Up
            </Button>

            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/" className="underline">
                Sign in
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
