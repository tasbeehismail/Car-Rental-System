import db from '../../../../database/connection.js';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';

// the owners or admins not have to sign up, we just need to login and the accounts are already created
export const signup = async (req, res) => { 
    try {
        const { email, password, phone, name } = req.body;

        const emailExists = await db.collection('users').findOne({ email });
        if (emailExists) {
            return res.status(409).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await db.collection('users').insertOne({ email, password: hashedPassword, phone, name, role: 'customer' });

        return res.status(201).json({ message: 'User created successfully', data: result });

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }

};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await db.collection('users').findOne({ email });
        if (!result) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, result.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Wrong password' });
        }

        return res.status(200).json({ message: 'User logged in successfully', data: result });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const getUsers = async (req, res) => {
    try {
        const result = await db.collection('users').find({}, { 
            projection: {
                 _id: 0,
                 name: 1,
                 email: 1,
                 phone: 1
                } 
            } ).toArray();   
        return res.status(200).json({ message: 'Users fetched successfully', data: result });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const getUser = async (req, res) => {
    try {
        const result = await db.collection('users').findOne({ _id: new ObjectId(req.params.user_id) }, {
            projection: {
                _id: 0,
                name: 1,
                email: 1,
                phone: 1
            }
        });
        return res.status(200).json({ message: 'User fetched successfully', data: result });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};
const isOwner = async (user_id) => {
    const user = await db.collection('users').findOne({ _id: new ObjectId(user_id) });
    return user && user.role === 'owner';
};
// Any user can update or delete their own account, but only the owner can change any user's account.
export const updateUser = async (req, res) => {
    try {
        const { user_id } = req.params;
        const ownerCheck = await isOwner(user_id);
        if(!ownerCheck && user_id != req.body.customer_id) {
            return res.status(403).send({message: 'Permission denied'});
        }

        const { customer_id, ...updateFields } = req.body;
        let updatedUser = await db.collection('users').updateOne(
            { _id: new ObjectId(req.body.customer_id) }, 
            { $set: updateFields });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ message: 'User updated successfully', data: updatedUser });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteUser = async (req, res) => {
    const { user_id } = req.params;
    const { customer_id } = req.body;
    try {
        const ownerCheck = await isOwner(user_id);
        if(!ownerCheck && user_id != customer_id) {
            return res.status(403).send({message: 'Permission denied'});
        }
        const result = await db.collection('users').deleteOne({ _id: new ObjectId(customer_id) });
        if (!result) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ message: 'User deleted successfully', data: result });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}