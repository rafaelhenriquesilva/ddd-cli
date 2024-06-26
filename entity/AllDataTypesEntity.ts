
      import { AllDataTypesDTO } from '../dto/AllDataTypesDTO'
        export class AllDataTypesEntity 
      {
      
      private readonly _id: number 
private readonly _smallIntCol: number 
private readonly _integerCol: number 
private readonly _bigIntCol: number 
private readonly _decimalCol: number 
private readonly _numericCol: number 
private readonly _realCol: number 
private readonly _doublePrecisionCol: number 
private readonly _smallSerialCol: number 
private readonly _serialCol: number 
private readonly _bigSerialCol: number 
private readonly _moneyCol: string 
private readonly _charCol: string 
private readonly _varcharCol: string 
private readonly _textCol: string 
private readonly _byteaCol: Buffer 
private readonly _dateCol: string 
private readonly _timeCol: string 
private readonly _timeWithTzCol: string 
private readonly _timestampCol: string 
private readonly _timestampWithTzCol: string 
private readonly _intervalCol: string 
private readonly _booleanCol: boolean 
private readonly _uuidCol: string 
private readonly _jsonCol: any 
private readonly _jsonbCol: any 
private readonly _xmlCol: string 
private readonly _pointCol: string 
private readonly _lineCol: string 
private readonly _lsegCol: string 
private readonly _boxCol: string 
private readonly _pathCol: string 
private readonly _polygonCol: string 
private readonly _circleCol: string 
private readonly _cidrCol: string 
private readonly _inetCol: string 
private readonly _macaddrCol: string 
private readonly _bitCol: string 
private readonly _varbitCol: string 
private readonly _tsqueryCol: string 
private readonly _tsvectorCol: string 
private readonly _int4rangeCol: string 
private readonly _int8rangeCol: string 
private readonly _numrangeCol: string 
private readonly _tsrangeCol: string 
private readonly _tstzrangeCol: string 
private readonly _daterangeCol: string 

 constructor(dto: AllDataTypesDTO) {this._id = dto.id 
this._smallIntCol = dto.smallIntCol 
this._integerCol = dto.integerCol 
this._bigIntCol = dto.bigIntCol 
this._decimalCol = dto.decimalCol 
this._numericCol = dto.numericCol 
this._realCol = dto.realCol 
this._doublePrecisionCol = dto.doublePrecisionCol 
this._smallSerialCol = dto.smallSerialCol 
this._serialCol = dto.serialCol 
this._bigSerialCol = dto.bigSerialCol 
this._moneyCol = dto.moneyCol 
this._charCol = dto.charCol 
this._varcharCol = dto.varcharCol 
this._textCol = dto.textCol 
this._byteaCol = dto.byteaCol 
this._dateCol = dto.dateCol 
this._timeCol = dto.timeCol 
this._timeWithTzCol = dto.timeWithTzCol 
this._timestampCol = dto.timestampCol 
this._timestampWithTzCol = dto.timestampWithTzCol 
this._intervalCol = dto.intervalCol 
this._booleanCol = dto.booleanCol 
this._uuidCol = dto.uuidCol 
this._jsonCol = dto.jsonCol 
this._jsonbCol = dto.jsonbCol 
this._xmlCol = dto.xmlCol 
this._pointCol = dto.pointCol 
this._lineCol = dto.lineCol 
this._lsegCol = dto.lsegCol 
this._boxCol = dto.boxCol 
this._pathCol = dto.pathCol 
this._polygonCol = dto.polygonCol 
this._circleCol = dto.circleCol 
this._cidrCol = dto.cidrCol 
this._inetCol = dto.inetCol 
this._macaddrCol = dto.macaddrCol 
this._bitCol = dto.bitCol 
this._varbitCol = dto.varbitCol 
this._tsqueryCol = dto.tsqueryCol 
this._tsvectorCol = dto.tsvectorCol 
this._int4rangeCol = dto.int4rangeCol 
this._int8rangeCol = dto.int8rangeCol 
this._numrangeCol = dto.numrangeCol 
this._tsrangeCol = dto.tsrangeCol 
this._tstzrangeCol = dto.tstzrangeCol 
this._daterangeCol = dto.daterangeCol 
}

             public get id(): number {
                    return this._id
            } 

             public get smallIntCol(): number {
                    return this._smallIntCol
            } 

             public get integerCol(): number {
                    return this._integerCol
            } 

             public get bigIntCol(): number {
                    return this._bigIntCol
            } 

             public get decimalCol(): number {
                    return this._decimalCol
            } 

             public get numericCol(): number {
                    return this._numericCol
            } 

             public get realCol(): number {
                    return this._realCol
            } 

             public get doublePrecisionCol(): number {
                    return this._doublePrecisionCol
            } 

             public get smallSerialCol(): number {
                    return this._smallSerialCol
            } 

             public get serialCol(): number {
                    return this._serialCol
            } 

             public get bigSerialCol(): number {
                    return this._bigSerialCol
            } 

             public get moneyCol(): string {
                    return this._moneyCol
            } 

             public get charCol(): string {
                    return this._charCol
            } 

             public get varcharCol(): string {
                    return this._varcharCol
            } 

             public get textCol(): string {
                    return this._textCol
            } 

             public get byteaCol(): Buffer {
                    return this._byteaCol
            } 

             public get dateCol(): string {
                    return this._dateCol
            } 

             public get timeCol(): string {
                    return this._timeCol
            } 

             public get timeWithTzCol(): string {
                    return this._timeWithTzCol
            } 

             public get timestampCol(): string {
                    return this._timestampCol
            } 

             public get timestampWithTzCol(): string {
                    return this._timestampWithTzCol
            } 

             public get intervalCol(): string {
                    return this._intervalCol
            } 

             public get booleanCol(): boolean {
                    return this._booleanCol
            } 

             public get uuidCol(): string {
                    return this._uuidCol
            } 

             public get jsonCol(): any {
                    return this._jsonCol
            } 

             public get jsonbCol(): any {
                    return this._jsonbCol
            } 

             public get xmlCol(): string {
                    return this._xmlCol
            } 

             public get pointCol(): string {
                    return this._pointCol
            } 

             public get lineCol(): string {
                    return this._lineCol
            } 

             public get lsegCol(): string {
                    return this._lsegCol
            } 

             public get boxCol(): string {
                    return this._boxCol
            } 

             public get pathCol(): string {
                    return this._pathCol
            } 

             public get polygonCol(): string {
                    return this._polygonCol
            } 

             public get circleCol(): string {
                    return this._circleCol
            } 

             public get cidrCol(): string {
                    return this._cidrCol
            } 

             public get inetCol(): string {
                    return this._inetCol
            } 

             public get macaddrCol(): string {
                    return this._macaddrCol
            } 

             public get bitCol(): string {
                    return this._bitCol
            } 

             public get varbitCol(): string {
                    return this._varbitCol
            } 

             public get tsqueryCol(): string {
                    return this._tsqueryCol
            } 

             public get tsvectorCol(): string {
                    return this._tsvectorCol
            } 

             public get int4rangeCol(): string {
                    return this._int4rangeCol
            } 

             public get int8rangeCol(): string {
                    return this._int8rangeCol
            } 

             public get numrangeCol(): string {
                    return this._numrangeCol
            } 

             public get tsrangeCol(): string {
                    return this._tsrangeCol
            } 

             public get tstzrangeCol(): string {
                    return this._tstzrangeCol
            } 

             public get daterangeCol(): string {
                    return this._daterangeCol
            } 
toJson(): AllDataTypesDTO {
return {
id: this.id, 
smallIntCol: this.smallIntCol, 
integerCol: this.integerCol, 
bigIntCol: this.bigIntCol, 
decimalCol: this.decimalCol, 
numericCol: this.numericCol, 
realCol: this.realCol, 
doublePrecisionCol: this.doublePrecisionCol, 
smallSerialCol: this.smallSerialCol, 
serialCol: this.serialCol, 
bigSerialCol: this.bigSerialCol, 
moneyCol: this.moneyCol, 
charCol: this.charCol, 
varcharCol: this.varcharCol, 
textCol: this.textCol, 
byteaCol: this.byteaCol, 
dateCol: this.dateCol, 
timeCol: this.timeCol, 
timeWithTzCol: this.timeWithTzCol, 
timestampCol: this.timestampCol, 
timestampWithTzCol: this.timestampWithTzCol, 
intervalCol: this.intervalCol, 
booleanCol: this.booleanCol, 
uuidCol: this.uuidCol, 
jsonCol: this.jsonCol, 
jsonbCol: this.jsonbCol, 
xmlCol: this.xmlCol, 
pointCol: this.pointCol, 
lineCol: this.lineCol, 
lsegCol: this.lsegCol, 
boxCol: this.boxCol, 
pathCol: this.pathCol, 
polygonCol: this.polygonCol, 
circleCol: this.circleCol, 
cidrCol: this.cidrCol, 
inetCol: this.inetCol, 
macaddrCol: this.macaddrCol, 
bitCol: this.bitCol, 
varbitCol: this.varbitCol, 
tsqueryCol: this.tsqueryCol, 
tsvectorCol: this.tsvectorCol, 
int4rangeCol: this.int4rangeCol, 
int8rangeCol: this.int8rangeCol, 
numrangeCol: this.numrangeCol, 
tsrangeCol: this.tsrangeCol, 
tstzrangeCol: this.tstzrangeCol, 
daterangeCol: this.daterangeCol, 
}
}
}