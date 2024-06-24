import LoginForm from "../../components/LoginForm";

export const LoginPage = () => {
  return (
    <div className="flex h-full sm:w-full">
      <div className="hidden lg:block lg:w-1/2 sm:w-full bg-primary">
        <div className="none h-full flex flex-col justify-center align-middle text-center">
          <div className="w-2/3 m-auto text-left">
            <h1 className="font-bold text-white text-7xl mb-4">
              Stori Newsletter
            </h1>
            <h2 className="text-white text-3xl font-medium">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </h2>
          </div>
        </div>
      </div>
      <div className="h-full lg:w-1/2 w-full bg-secondary flex flex-col justify-center align-middle text-center overflow-auto">
        <div className="text-left w-2/3 m-auto">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};
