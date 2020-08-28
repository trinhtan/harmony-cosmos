package ethbridge

// nolint
// autogenerated code using github.com/rigelrozanski/multitool
// aliases generated for the following subdirectories:
// ALIASGEN: github.com/trinhtan/harmony-cosmos/x/ethbridge/querier
// ALIASGEN: github.com/trinhtan/harmony-cosmos/x/ethbridge/types

import (
	"github.com/trinhtan/harmony-cosmos/x/ethbridge/keeper"
	"github.com/trinhtan/harmony-cosmos/x/ethbridge/types"
)

const (
	QueryEthProphecy = types.QueryEthProphecy
	ModuleName       = types.ModuleName
	StoreKey         = types.StoreKey
	QuerierRoute     = types.QuerierRoute
	RouterKey        = types.RouterKey
)

var (
	// functions aliases

	NewKeeper                         = keeper.NewKeeper
	NewQuerier                        = keeper.NewQuerier
	NewEthBridgeClaim                 = types.NewEthBridgeClaim
	NewOracleClaimContent             = types.NewOracleClaimContent
	CreateOracleClaimFromEthClaim     = types.CreateOracleClaimFromEthClaim
	CreateEthClaimFromOracleString    = types.CreateEthClaimFromOracleString
	CreateOracleClaimFromOracleString = types.CreateOracleClaimFromOracleString
	RegisterCodec                     = types.RegisterCodec
	ErrInvalidEthNonce                = types.ErrInvalidEthNonce
	ErrInvalidEthAddress              = types.ErrInvalidEthAddress
	ErrJSONMarshalling                = types.ErrJSONMarshalling
	NewEthereumAddress                = types.NewEthereumAddress
	NewMsgCreateEthBridgeClaim        = types.NewMsgCreateEthBridgeClaim
	MapOracleClaimsToEthBridgeClaims  = types.MapOracleClaimsToEthBridgeClaims
	NewQueryEthProphecyParams         = types.NewQueryEthProphecyParams
	NewQueryEthProphecyResponse       = types.NewQueryEthProphecyResponse

	CreateTestEthMsg                   = types.CreateTestEthMsg
	CreateTestEthClaim                 = types.CreateTestEthClaim
	CreateTestQueryEthProphecyResponse = types.CreateTestQueryEthProphecyResponse
)

type (
	Keeper                   = keeper.Keeper
	EthBridgeClaim           = types.EthBridgeClaim //nolint:golint
	OracleClaimContent       = types.OracleClaimContent
	EthereumAddress          = types.EthereumAddress
	MsgCreateEthBridgeClaim  = types.MsgCreateEthBridgeClaim
	MsgBurn                  = types.MsgBurn
	MsgLock                  = types.MsgLock
	QueryEthProphecyParams   = types.QueryEthProphecyParams
	QueryEthProphecyResponse = types.QueryEthProphecyResponse
)
