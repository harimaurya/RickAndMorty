import PageTitle from "@/components/shared/PageTitle";
import ProfileForm from "@/components/shared/ProfileForm";

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4">
      <PageTitle>Profile</PageTitle>
      <div className="flex justify-between mt-6">
        <ProfileForm />
      </div>
    </div>
  );
}
