import { User, Info, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMemberStore } from "@/stores/staff/member.stores";
import { useMemberForm } from "@/hooks/use-member-form";

const AddMemeberModal = () => {
  const { createModalState, setCreateModalState } = useMemberStore();
  const { createForm: form, isCreating, onCreateSubmit } = useMemberForm();

  return (
    <Dialog open={createModalState} onOpenChange={setCreateModalState}>
      <DialogContent
        className="max-w-md border-slate-200 rounded-xl"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <div className="flex items-center gap-3 mb-1">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100/80">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <DialogTitle className="text-slate-900 text-lg">
              Add New Member
            </DialogTitle>
          </div>
          <DialogDescription asChild>
            <div className="pt-2 space-y-3">
              <p className="text-slate-600 text-base">
                Fill in the basic profile information to register this staff
                member.
              </p>

              <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                <div className="flex gap-3">
                  <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-blue-800 leading-relaxed">
                    By saving this profile, the member will be granted access to
                    this application.
                  </p>
                </div>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onCreateSubmit)}
            className="space-y-5 py-2"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-700 font-medium">
                    Username <span className="text-red-700">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. jdoe_dev"
                      className="border-slate-200 focus-visible:ring-blue-500/20 focus-visible:border-blue-400 transition-all bg-slate-50/30"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-medium">
                      First Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John"
                        className="border-slate-200 focus-visible:ring-blue-500/20 focus-visible:border-blue-400 bg-slate-50/30"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-medium">
                      Last Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Doe"
                        className="border-slate-200 focus-visible:ring-blue-500/20 focus-visible:border-blue-400 bg-slate-50/30"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="flex gap-2 pt-4">
              <button
                type="button"
                onClick={() => setCreateModalState(false)}
                className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 border border-gray-300 hover:border-gray-400 rounded-lg transition-colors disabled:opacity-50"
                disabled={isCreating}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 text-sm font-medium"
                disabled={isCreating}
              >
                <Check className="w-4 h-4" />
                Create Member
              </button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddMemeberModal;
