import { api } from "@/utils/api";
import { LoadingSpinner } from "@/components/loading";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";

type FormValues = {
  postBody: string;
};

export const CreatePostWizard = () => {
  // Grab context
  const ctx = api.useContext();

  // TRPC MUTATION
  const { mutate, isLoading: isPosting } = api.posts.makePost.useMutation({
    onSuccess: () => {
      void ctx.posts.getAll.invalidate();
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.postBody;
      if (errorMessage && errorMessage[0]) {
        toast.error(errorMessage[0]);
      } else {
        toast.error("Failed to Post! We only accept Emojis 😂");
      }
    },
  });

  //React Hook Form Handler
  const { register, handleSubmit, reset, watch } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    mutate(data);
    reset();
  };

  return (
    <div className="flex w-full ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative flex grow flex-col "
      >
        <div className=" m-5 whitespace-normal border-b">
          <textarea
            placeholder="Enter an Emoji:"
            className="h-20 w-full resize-none rounded-lg bg-transparent p-2 text-2xl outline-none"
            {...register("postBody", { required: true })}
            disabled={isPosting}
          ></textarea>
        </div>

        <div className="h-5 "></div>

        {watch("postBody") !== "" && !isPosting && (
          <button
            type="submit"
            disabled={isPosting}
            className="absolute bottom-0 right-0"
          >
            Chirp
          </button>
        )}

        {isPosting && (
          <div className="absolute bottom-0 right-0">
            <LoadingSpinner size={30}></LoadingSpinner>
          </div>
        )}
      </form>
    </div>
  );
};
