import useAuth from "../../hooks/useAuth";

const Profile = () => {
  const { user } = useAuth();
  return (
    <section>
      <div className="card items-center bg-base-100 px-5 py-10 rounded-xl shadow-sm">
        <figure className="overflow-hidden w-22 h-22 rounded-full">
          <img
            className="w-full h-full object-cover"
            src={user.photoURL}
            alt=""
          />
        </figure>
        <div className="grid grid-cols-3 gap-10 px-3 py-10">
          <div className="flex flex-col justify-center">
            <p className="text-accent">Name</p>
            <p>{user.displayName}</p>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-accent ">Email</p>
            <p>{user.email}</p>
          </div>
          <div className="flex flex-col justify-center gap-2">
            <button className="btn btn-primary btn-sm w-full text-accent rounded-full">
              Update Profile
            </button>
            <button className="btn btn-primary btn-sm w-full text-accent rounded-full">
              Change Password
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
