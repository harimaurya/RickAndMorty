import { ProfileFormProps } from "./ProfileForm";

const MockProfileForm = ({ isRegister, onSuccess }: ProfileFormProps) => {
  return (
    <div data-testid="profile-form">
      <span data-testid="is-register">{String(!!isRegister)}</span>
      <button type="button" data-testid="submit" onClick={() => onSuccess?.()}>
        Submit
      </button>
    </div>
  );
};

export default MockProfileForm;
