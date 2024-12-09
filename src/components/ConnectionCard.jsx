function ConnectionCard({ user }) {
    const { firstName, lastName, photoUrl, gender, age, about } = user;
    return (
      <div className="flex bg-base-300 rounded-xl shadow-xl mx-auto w-3/4 md:1/2 my-5 items-center">
        <figure>
          <img
            src={photoUrl}
            className="w-36 md:w-24 md:h-24 h-36 rounded-lg  ml-3 "
            alt="user-img"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
          {age && gender && (
            <h2>
              {age},{gender}
            </h2>
          )}
          <p className="text-sm md:text-l">{about}</p>
        </div>
      </div>
    );
  }
  
  export default ConnectionCard;