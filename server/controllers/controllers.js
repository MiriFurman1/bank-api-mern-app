
import { Account } from '../models/accounts.model.js'

export const getAccounts = async (req, res) => {
    try {
        const accounts = await Account.find()
        res.status(200).send(accounts);
    }
    catch (err) {
        res.send(err.message)
    }
}


export const addAccount = async (req, res) => {

    try {
        const { body } = req
        const newAccount = await Account.create(body);
        res.status(201).send(newAccount)
    }
    catch (err) {
        res.send(err.message)
    }
}



export const getAccountById = async (req, res) => {
    const { id } = req.params;
    try {
        const account = await Account.findById(id);
        res.status(200).send(account)
    } catch (error) {
        res.status(404).send({ message: error.message });
    }
};


export const depositMoney = async (req, res) => {
    const moneyToDeposit = req.body.deposit;
    const { id } = req.params;
    try {
        if (moneyToDeposit < 0) {
            throw new Error("Can deposit only positive number");
        }
        const account = await Account.findById(id);
        if (!account) {
            throw new Error("no user found")
        }
        const result = await Account.updateOne(account,
            { $inc: { cash: moneyToDeposit } }
        );
        res.status(200).send(account);

    } catch (error) {
        res.status(404).send({ message: error.message });
    }
};

export const deleteAccount = async (req, res) => {
    const { id } = req.params;
    try {
        await Account.findByIdAndRemove(id)
        res.status(200).send({ message: "Account deleted successfully" });
    } catch (error) {
        res.status(404).send({ message: error.message });
    }
}

export const withdrawMoney = async (req, res) => {
    const moneyToWithdraw = req.body.withdraw;
    const { id } = req.params;
    try {
        if (moneyToWithdraw < 0) {
            throw new Error("Can deposit only positive number");
        }
        const account = await Account.findById(id);
        if (!account) {
            throw new Error("no user found")
        }
        if (account.cash + account.credit < moneyToWithdraw) {
            throw new Error("can't withdraw more than you have")
        }
        const result = await Account.updateOne(account,
            { $inc: { cash: -moneyToWithdraw } }
        );
        res.status(200).send(account);

    } catch (error) {
        res.status(404).send({ message: error.message });
    }
}

export const transferMoney = async (req, res) => {
    const { withdrawId, depositId, amount } = req.body;
    try {
        if ( amount < 0) {
            throw new Error("Can deposit only positive number");
        }
        const withdrawAccount = await Account.findById(withdrawId);
        if (!withdrawAccount) {
            throw new Error("no user to withdraw found")
        }
        const depositAccount = await Account.findById(depositId);
        if (!depositAccount) {
            throw new Error("no user to withdraw found")
        }

        if (withdrawAccount .cash + withdrawAccount.credit < amount) {
            throw new Error("can't transfer more money than you have")
        }
        const result = await Account.updateOne(withdrawAccount,
            { $inc: { cash: -amount } }
        );
        const result2 = await Account.updateOne(depositAccount,
            { $inc: { cash: amount } }
        );
        res.status(200).send("transfer succeeded");

    } catch (error) {
        res.status(404).send({ message: error.message });
    }
}


function transferMoney1(idToWithdraw, idToDeposit, amount) {
    const accounts = loadAccounts();
    // console.log(idToDeposit);
    const withdrawAccount = accounts.find((a) => {
        return a.id === idToWithdraw;
    });
    const depositAccount = accounts.find((a) => {
        return a.id === idToDeposit;
    });
    if (idToWithdraw === idToDeposit) {
        throw new Error("You can't transfer money to the same id as the withdraw id")
    }
    if (amount < 0) {
        throw new Error("You can't transfer negative amount")
    }
    if (amount != parseInt(amount)) {
        throw new Error("the amount field can't have a letter in it")
    }

    if (parseInt(withdrawAccount.cash) + parseInt(withdrawAccount.credit) < parseInt(amount)) {
        throw new Error("can't transfer more money than you have")
    }

    withdrawMoney(idToWithdraw, { "withdraw": amount })
    depositMoney(idToDeposit, { "deposit": amount })
    return "transfer succeeded"
}


export const updateCredit = async (req, res) => {
    const newCredit = req.body.newCredit;
    const { id } = req.params;
    try {
        if (newCredit < 0) {
            throw new Error("Credit can be only positive number");
        }
        const account = await Account.findById(id);
        if (!account) {
            throw new Error("no user found")
        }

        const result = await Account.updateOne(account,
            { credit: newCredit }
        );
        res.status(200).send(account);

    } catch (error) {
        res.status(404).send({ message: error.message });
    }
}


