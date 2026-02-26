interface User {
  name: string;
  email: string;
}

export default function User({ name, email }: User) {
  return (
    <>
      <div>{`Name : ${name}   and Email : ${email}`}</div>
    </>
  );
}
