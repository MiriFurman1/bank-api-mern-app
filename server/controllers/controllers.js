
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
// export const withdrawMoney1=async(id, moneyToWithdraw) =>{
//     const accounts = loadAccounts();
//     if (parseInt(moneyToWithdraw.withdraw) != (moneyToWithdraw.withdraw)) {
//         throw new Error("no letters allowed in the withdraw field")
//     }

//     if (moneyToWithdraw.withdraw < 0) {
//         throw new Error("Can withdraw only positive number");
//     }
//     const foundAccount = accounts.find((a) => {
//         return a.id === id;
//     });
//     if (!foundAccount) {
//         throw new Error("The account does not exist, cannot update!");
//     }
//     if (parseInt(moneyToWithdraw.withdraw) < 0) {
//         throw new Error("Can withdraw only positive number");
//     }
//     if (parseInt(moneyToWithdraw.withdraw) > parseInt(foundAccount.cash) + parseInt(foundAccount.credit)) {
//         throw new Error("Can withdraw only less than cash+credit");
//     }
//     let updatedCash = parseInt(foundAccount.cash) - parseInt(moneyToWithdraw.withdraw);
//     const updatedAccount = {
//         ...foundAccount,
//         cash: updatedCash
//     };
//     const index = accounts.findIndex((a) => a.id === id);
//     accounts[index] = updatedAccount;
//     saveAccounts(accounts);
//     return updatedAccount;
// }

function transferMoney(idToWithdraw, idToDeposit, amount) {
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

function updateCredit(id, credit) {
    const accounts = loadAccounts();
    if (parseInt(credit.credit) != (credit.credit)) {
        throw new Error("no letters allowed in the credit field")
    }
    const foundAccount = accounts.find((a) => {
        return a.id === id;
    });
    if (!foundAccount) {
        throw new Error("The account does not exist, cannot update!");
    }
    if (credit.credit < 0) {
        throw new Error("credit can be positive number");
    }

    const updatedAccount = {
        ...foundAccount,
        credit: credit.credit
    };
    const index = accounts.findIndex((a) => a.id === id);
    accounts[index] = updatedAccount;
    saveAccounts(accounts);
    return updatedAccount;
}




