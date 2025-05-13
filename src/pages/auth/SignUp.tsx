// SignUp.tsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Eye, EyeOff, Facebook } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const SignUp = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [userType, setUserType] = React.useState<'student' | 'organisation' | 'speaker'>('student');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fullName = (document.getElementById("fullName") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const username = (document.getElementById("username") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;

    try {
      const response = await fetch("http://localhost:8080/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullName, email, username, password })
      });

      if (response.ok) {
        alert("✅ Signup successful! Please login.");
        navigate("/");
      } else {
        const errMsg = await response.text();
        alert("❌ Signup failed: " + errMsg);
      }
    } catch (error) {
      console.error("Signup Error:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="hidden md:flex flex-col justify-center p-12 bg-gradient-to-br from-purple-700 via-purple-600 to-pink-600">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-white">Sign Up</h1>
          <h2 className="text-2xl md:text-3xl text-white/90">Student Registration</h2>
        </div>
      </div>

      <div className="flex items-center justify-center p-8">
        <Card className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
          <div className="flex gap-2 mb-6">
            {['student', 'organisation', 'speaker'].map((type) => (
              <Button
                key={type}
                variant={userType === type ? 'default' : 'outline'}
                onClick={() => setUserType(type as any)}
                className="flex-1 capitalize"
              >
                {type}
              </Button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" placeholder="Enter your full name" required />
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="example@gmail.com" required />
              </div>

              <div>
                <Label htmlFor="username">Username</Label>
                <Input id="username" placeholder="johnkevin4362" required />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" required />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the terms of service and privacy policy.
                </label>
              </div>

              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                Create Account
              </Button>

              <p className="text-center text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="font-semibold text-purple-600 hover:underline">
                  Log in
                </Link>
              </p>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
