import { useForm, usePage } from "@inertiajs/react";
import AccountLayout from "./account-layout";
import { SharedData } from "@/types";
import { FormEventHandler } from "react";
import { toast } from "react-toastify";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from "@/components/ui/button";
import { Mail, Phone, User } from "lucide-react";

type ProfileForm = {
    name: string;
    email: string;
    phone?: string;
}
export default function Setting() {
    const { auth } = usePage<SharedData>().props;
    console.log(auth.user);
    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm<Required<ProfileForm>>({
        name: auth.user.name,
        email: auth.user.email,
        phone: auth.user.phone || "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('setting.update'), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Settings updated successfully!');
            },
            onError: (errors) => {
                toast.error('Failed to update settings.');
            },
        });
    };
    return (
        <>
            <AccountLayout>
                <div className="lg:w-3/4 md:w-2/3 md:px-3 mt-6 md:mt-0">
                    <div className="p-6 rounded-md shadow-sm dark:shadow-gray-800 bg-white dark:bg-slate-900">
                        <h5 className="text-lg font-semibold mb-4">Personal Detail :</h5>
                        <form onSubmit={submit}>
                            <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
                                <div>
                                    <label className="form-label font-medium">Full Name : <span className="text-red-600">*</span></label>
                                    <div className="form-icon relative mt-2">
                                        <User className="w-4 h-4 absolute top-3 start-4"/>
                                        <input type="text" className="ps-12 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0" id="name" value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            required
                                            autoComplete="name"
                                            placeholder="Full name" />
                                    </div>
                                </div>
                                <div>
                                    <label className="form-label font-medium">Your Email : <span className="text-red-600">*</span></label>
                                    <div className="form-icon relative mt-2">
                                        <Mail className="w-4 h-4 absolute top-3 start-4"/>
                                        <input id="email"
                                            type="email" className="ps-12 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0" value={data.email}
                                            required
                                            autoComplete="username"
                                            disabled />
                                    </div>
                                </div>
                                <div>
                                    <label className="form-label font-medium">Phone No. : </label>
                                    <div className="form-icon relative mt-2">
                                        <Phone className="w-4 h-4 absolute top-3 start-4"/>
                                        <input
                                            name="phone"
                                            id="phone"
                                            type="text"
                                            className="ps-12 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                                            placeholder="+91 00000 00085"
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            {errors.email && <p className="text-red-600 mt-2">{errors.email}</p>}
                            <button disabled={processing} type="submit" className="py-2 px-5 inline-block font-semibold tracking-wide align-middle duration-500 text-base text-center bg-orange-500 text-white rounded-md mt-5 cursor-pointer">{processing ? 'Processing...' : 'Save Changes'}</button>
                        </form>
                    </div>

                    <DeleteAccount />
                </div>
            </AccountLayout>
        </>
    )
}

export function DeleteAccount() {
    const { delete: destroy, processing, reset, clearErrors } = useForm();

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route('setting.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        clearErrors();
        reset();
    };
    return (
        <>
            <div className="p-6 rounded-md shadow-sm dark:shadow-gray-800 bg-white dark:bg-slate-900 mt-6">
                <h5 className="text-lg font-semibold mb-5 text-red-600">Delete Account :</h5>

                <p className="text-slate-400 mb-4">Do you want to delete the account? Please press below "Delete" button</p>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="destructive">Delete account</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogTitle>Are you sure you want to delete your account?</DialogTitle>
                        <DialogDescription>
                            Once your account is deleted, all of its resources and data will also be permanently deleted. Please confirm
                            you would like to permanently delete your account.
                        </DialogDescription>
                        <form className="space-y-6" onSubmit={deleteUser}>
                            <DialogFooter className="gap-2">
                                <DialogClose asChild>
                                    <Button variant="secondary" onClick={closeModal}>
                                        Cancel
                                    </Button>
                                </DialogClose>

                                <Button variant="destructive" disabled={processing} asChild>
                                    <button type="submit">Delete account</button>
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    )
}

