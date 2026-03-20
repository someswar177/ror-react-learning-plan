module Mutations
    class UpdateUser < BaseMutation
        argument :id, ID, required: true
        argument :name, String, required: false
        argument :email, String, required: false

        field :user, Types::UserType, null: true
        field :errors, [String], null: false

        def resolve(id:, **attrs)
            user = User.find_by(id: id)
            return { user: nil, errors: ["User not found"] } unless user
            if user.update(attrs)
                { user: user, errors:[] }
            else
                { user: nil, errors: user.errors.full_messages }
            end
        end
    end
end