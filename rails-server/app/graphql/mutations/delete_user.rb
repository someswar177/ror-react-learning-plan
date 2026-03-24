module Mutations
    class DeleteUser < Mutations::BaseMutation
        argument :id, ID, required: true
        field :message, String, null: false

        def resolve(id:)
            user = User.find_by(id:id)
            return { message: "User not found" } unless User

            user.destroy
            { message: "User deleted successfully" }
        end
    end
end