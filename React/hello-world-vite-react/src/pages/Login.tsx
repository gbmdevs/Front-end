
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"; 
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import { post } from "@/lib/api";

interface LoginResponse {
    token: string;
}

const Login = () => {
  const navigate = useNavigate(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(import.meta.env.VITE_API_BASE_URL);
    try {
        // Send login request to the API
        const response = await post<LoginResponse>("/auth/login", {
          email,
          password,
        }); 
        console.log(response.token);
        //const { token } = response.token;
        //localStorage.setItem("token", token); // Store token in localStorage
  
        // Redirect to dashboard or another protected route
        navigate("/");
      } catch (err) {
        // Handle errors (e.g., wrong credentials or network issues)
        console.error("Login failed:", err);
        setError("Invalid email or password. Please try again.");
      } finally {
        setIsLoading(false);
      } 
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Bem vindo</CardTitle> 
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-2">
            <div className="space-y-2 ">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-sm text-primary hover:underline">
                  Esqueceu a senha?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </CardFooter>
        </form>
        <div className="text-center pb-6">
          <p className="text-sm text-muted-foreground">
            Não possui cadastro?{" "}
            <a href="#" className="text-primary hover:underline">
              Cadastre-se
            </a>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Login;