import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AdminLoginProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

export const AdminLogin = ({ isOpen, onClose, onLogin }: AdminLoginProps) => {
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email] = useState("u.chethanraj.business@gmail.com");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSendOTP = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('send-otp', {
        body: { email }
      });

      if (error) throw error;

      toast({
        title: "OTP Sent",
        description: "Check your email for the verification code",
      });
      setStep("otp");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send OTP",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a 6-digit code",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('verify-otp', {
        body: { email, otp }
      });

      if (error) throw error;

      localStorage.setItem('admin_session', data.sessionToken);
      toast({
        title: "Login Successful",
        description: "Welcome to the admin panel",
      });
      
      onLogin();
      onClose();
      // Redirect to admin dashboard
      window.location.href = '/admin';
    } catch (error: any) {
      toast({
        title: "Invalid OTP",
        description: error.message || "Please check your code and try again",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setStep("email");
    setOtp("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Admin Access</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Admin Access</h3>
              <p className="text-sm text-muted-foreground">
                An OTP will be sent to your registered email address
              </p>
            </div>
          </div>
          <Button 
            onClick={handleSendOTP} 
            disabled={loading}
            className="w-full"
            size="lg"
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </Button>
        </div>

        {step === "otp" && (
          <div className="space-y-4">
            <div>
              <Label>Enter OTP</Label>
              <div className="flex justify-center mt-2">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={(value) => setOtp(value)}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Check your email for the 6-digit code
              </p>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setStep("email")}
                className="flex-1"
              >
                Back
              </Button>
              <Button 
                onClick={handleVerifyOTP} 
                disabled={loading || otp.length !== 6}
                className="flex-1"
              >
                {loading ? "Verifying..." : "Verify"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};