var NameType;
(function (NameType) {
    NameType[NameType["NAME"] = 0] = "NAME";
    NameType[NameType["NICKNAME"] = 1] = "NICKNAME";
})(NameType || (NameType = {}));
var NamelizeStore = /** @class */ (function () {
    function NamelizeStore() {
    }
    NamelizeStore.names = [
        'John', 'Lenny', 'Jimmy', 'George', 'Marco', 'Matteo', 'Antonio', 'Pietro', 'Carlo',
        'Pierre', 'Adalberto', 'Angelo', 'Domenico', 'Emilio', 'Franco', 'Giuliano', 'Lazzaro',
        'Marcello', 'Ottavio', 'Paolo', 'Renzo', 'Victor', 'Ivan', 'Pietro', 'Alfonse', 'Giovanni'
    ];
    NamelizeStore.middleName = [
        'B.', 'D.', 'F.', 'G.', 'J.', 'L.', 'P.', 'R.', 'S.', 'T.', 'V.', 'de', 'el', 'van',
        'de la'
    ];
    NamelizeStore.surnames = [
        'Thompson', 'Milano', 'Colombo', 'Gallo', 'Teodoro', 'Sirguei', 'Sillas', 'Domingos',
        'Planisola', 'Authier', 'Lorenzo', 'Sebastiano', 'Salvatore', 'Valentino', 'Vitale',
        'Polca', 'Stanislawa'
    ];
    NamelizeStore.nicknameStartWith = [
        'Red', 'Big', 'Mister', 'Cold', 'Evil', 'The Great', 'Smart', 'Knocking', 'Suppliant',
        'Terrible', 'Infinite', 'Antonished', 'The Son of', 'Sowise', 'Unknown', 'Knight of'
    ];
    NamelizeStore.nicknameEndWith = [
        'Hat', 'Dog', 'Killer', 'Wall', 'Joe', 'Rabbit', 'Worker', 'Door', 'Survivor', 'Gate',
        'Shoot', 'War', 'Darkness', 'Norwegian'
    ];
    return NamelizeStore;
}());
var Randomize = /** @class */ (function () {
    function Randomize() {
    }
    Randomize.getInstance = function () {
        if (!this.instance) {
            this.instance = new Randomize();
        }
        return this.instance;
    };
    Randomize.prototype.random = function (to, from) {
        if (from === void 0) { from = 0; }
        return Math.round(Math.random() * to) + from;
    };
    Randomize.prototype.randomBoolean = function () {
        return !!this.random(1);
    };
    Randomize.prototype.fromArray = function (array) {
        return array[this.random(array.length - 1)];
    };
    return Randomize;
}());
var NamelizeService = /** @class */ (function () {
    function NamelizeService() {
        this.randomize = Randomize.getInstance();
    }
    NamelizeService.prototype.create = function () {
        var type = this.randomize.random(1);
        if (type === NameType.NAME) {
            return this.createName();
        }
        else if (type === NameType.NICKNAME) {
            return this.createNickname();
        }
    };
    NamelizeService.prototype.createName = function () {
        var useAbbreviation = this.randomize.randomBoolean();
        var name = this.randomize.fromArray(NamelizeStore.names);
        if (useAbbreviation) {
            name += ' ' + this.randomize.fromArray(NamelizeStore.middleName);
        }
        name += ' ' + this.randomize.fromArray(NamelizeStore.surnames);
        return name;
    };
    NamelizeService.prototype.createNickname = function () {
        var nickname = this.randomize.fromArray(NamelizeStore.nicknameStartWith);
        nickname += ' ' + this.randomize.fromArray([].concat(NamelizeStore.nicknameEndWith).concat(NamelizeStore.names).concat(NamelizeStore.surnames));
        return nickname;
    };
    return NamelizeService;
}());
