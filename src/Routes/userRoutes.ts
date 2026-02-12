import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';

const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user: any = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        return res.json({ msg: 'Login successful' });

    } catch (error) {
        return res.status(500).send('Server Error');
    }
};

export default loginUser;