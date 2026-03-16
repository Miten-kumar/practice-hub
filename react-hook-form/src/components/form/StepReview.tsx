interface Props {
  onPrev: () => void;
  onSubmit: () => void;
}

const StepReview = ({ onPrev, onSubmit }: Props) => {
  const personal = JSON.parse(localStorage.getItem("personalData") || "{}");
  const account = JSON.parse(localStorage.getItem("accountData") || "{}");
  const dynamic = JSON.parse(localStorage.getItem("dynamicData") || "{}");

  return (
    <section aria-labelledby="review-heading">
      <h2 id="review-heading">Review Your Information</h2>

      <section aria-labelledby="personal-review">
        <h3 id="personal-review">Personal Information</h3>
        <dl>
          <dt>First Name</dt><dd>{personal.first_name}</dd>
          <dt>Last Name</dt><dd>{personal.last_name}</dd>
          <dt>Email</dt><dd>{personal.email}</dd>
          <dt>Phone</dt><dd>{personal.phone}</dd>
        </dl>
      </section>

      <section aria-labelledby="account-review">
        <h3 id="account-review">Account</h3>
        <dl>
          <dt>Username</dt><dd>{account.username}</dd>
          <dt>Role</dt><dd>{account.role}</dd>
        </dl>
      </section>

      <section aria-labelledby="dynamic-review">
        <h3 id="dynamic-review">Additional Info</h3>
        <dl>
          {Object.entries(dynamic).map(([key, value]) => (
            <div key={key}>
              <dt>{key}</dt>
              <dd>{Array.isArray(value) ? value.join(", ") : String(value)}</dd>
            </div>
          ))}
        </dl>
      </section>

      <button type="button" onClick={onPrev}>Back</button>
      <button type="button" onClick={onSubmit}>Submit</button>
    </section>
  );
};

export default StepReview;