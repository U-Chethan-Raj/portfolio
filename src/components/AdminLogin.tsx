import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AdminLoginProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

export const AdminLogin = ({ isOpen, onClose, onLogin }: AdminLoginProps) => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  if (!isOpen) return null;

  const handleSendOtp = async () => {
    if (email !== "u.chethanraj.business@gmail.com") {
      toast({
        title: "Access Denied",
        description: "Invalid email address",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    // Simulate OTP sending (would need Supabase for real implementation)
    setTimeout(() => {
      setOtpSent(true);
      setIsLoading(false);
      toast({
        title: "OTP Sent",
        description: "Please check your email for the verification code"
      });
    }, 2000);
  };

  const handleVerifyOtp = () => {
    if (otp === "123456") { // Demo OTP for now
      toast({
        title: "Login Successful",
        description: "Welcome to the admin panel"
      });
      onLogin();
      onClose();
    } else {
      toast({
        title: "Invalid OTP",
        description: "Please check your verification code",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-background/95 backdrop-blur-md border border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Admin Access</CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Email Address</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              disabled={otpSent}
            />
          </div>

          {!otpSent ? (
            <Button 
              onClick={handleSendOtp} 
              className="w-full"
              disabled={!email || isLoading}
            >
              {isLoading ? "Sending..." : "Send OTP"}
            </Button>
          ) : (
            <>
              <div>
                <label className="text-sm font-medium">Verification Code</label>
                <Input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 6-digit OTP"
                  maxLength={6}
                />
              </div>
              <Button onClick={handleVerifyOtp} className="w-full">
                Verify & Login
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  setOtpSent(false);
                  setOtp("");
                }} 
                className="w-full"
              >
                Resend OTP
              </Button>
            </>
          )}

          <p className="text-xs text-muted-foreground text-center">
            Note: OTP functionality requires Supabase integration for email services
          </p>
        </CardContent>
      </Card>
    </div>
  );
};